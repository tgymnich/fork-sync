const expect = require('chai').expect
const Octokit = require('./octokit')

describe('Trigger Retries', function () {
  it('Should trigger exponential retries on HTTP 500 errors', async function () {
    const octokit = new Octokit({ retry: { retryAfterBaseValue: 50 } })

    const res = await octokit.request('GET /route', {
      request: {
        responses: [
          { status: 500, headers: {}, data: { message: 'Did not retry, one' } },
          { status: 500, headers: {}, data: { message: 'Did not retry, two' } },
          { status: 500, headers: {}, data: { message: 'Did not retry, three' } },
          { status: 200, headers: {}, data: { message: 'Success!' } }
        ]
      }
    })

    expect(res.status).to.equal(200)
    expect(res.data).to.include({ message: 'Success!' })
    expect(octokit.__requestLog).to.deep.equal([
      'START GET /route',
      'START GET /route',
      'START GET /route',
      'START GET /route',
      'END GET /route'
    ])
    expect(octokit.__requestTimings[1] - octokit.__requestTimings[0]).to.be.closeTo(50, 20)
    expect(octokit.__requestTimings[2] - octokit.__requestTimings[1]).to.be.closeTo(200, 20)
    expect(octokit.__requestTimings[3] - octokit.__requestTimings[2]).to.be.closeTo(450, 20)
  })

  it('Should not retry 3xx/400/401/403/422 errors', async function () {
    const octokit = new Octokit({ retry: { retryAfterBaseValue: 50 } })
    let caught = 0
    const testStatuses = [ 304, 400, 401, 403, 404, 422 ]

    for (const status of testStatuses) {
      try {
        await octokit.request('GET /route', {
          request: {
            responses: [
              { status, headers: {}, data: { message: `Error ${status}` } },
              { status: 500, headers: {}, data: { message: 'Error 500' } }
            ]
          }
        })
      } catch (error) {
        expect(error.message).to.equal(`Error ${status}`)
        caught++
      }
    }

    expect(caught).to.equal(testStatuses.length)
    expect(octokit.__requestLog).to.deep.equal(testStatuses.map(x => 'START GET /route'))
  })

  it('Should allow to override the doNotRetry list', async function () {
    const octokit = new Octokit({
      retry: {
        doNotRetry: [ 400 ],
        retries: 1,
        retryAfterBaseValue: 50
      }
    })
    let caught = 0
    const testStatuses = [ 304, 400, 401, 403, 404 ]

    for (const status of testStatuses) {
      try {
        await octokit.request('GET /route', {
          request: {
            responses: [
              { status, headers: {}, data: { message: `Error ${status}` } },
              { status: 500, headers: {}, data: { message: 'Error 500' } }
            ]
          }
        })
      } catch (error) {
        if (status === 400 || status < 400) {
          expect(error.message).to.equal(`Error ${status}`)
        } else {
          expect(error.message).to.equal(`Error 500`)
        }
        caught++
      }
    }

    expect(caught).to.equal(testStatuses.length)
  })
})
