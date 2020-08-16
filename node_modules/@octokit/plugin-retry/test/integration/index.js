const expect = require('chai').expect
const Octokit = require('./octokit')

describe('Automatic Retries', function () {
  it('Should be possible to disable the plugin', async function () {
    const octokit = new Octokit({ retry: { enabled: false } })

    try {
      await octokit.request('GET /route', {
        request: {
          responses: [
            { status: 403, headers: {}, data: { message: 'Did not retry' } },
            { status: 200, headers: {}, data: { message: 'Success!' } }
          ],
          retries: 1
        }
      })
      throw new Error('Should not reach this point')
    } catch (error) {
      expect(error.status).to.equal(403)
      expect(error.message).to.equal('Did not retry')
    }

    expect(octokit.__requestLog).to.deep.equal([
      'START GET /route'
    ])
  })

  it('Should retry once and pass', async function () {
    const octokit = new Octokit()

    const res = await octokit.request('GET /route', {
      request: {
        responses: [
          { status: 403, headers: {}, data: { message: 'Did not retry' } },
          { status: 200, headers: {}, data: { message: 'Success!' } }
        ],
        retries: 1
      }
    })

    expect(res.status).to.equal(200)
    expect(res.data).to.include({ message: 'Success!' })
    expect(octokit.__requestLog).to.deep.equal([
      'START GET /route',
      'START GET /route',
      'END GET /route'
    ])
    expect(octokit.__requestTimings[1] - octokit.__requestTimings[0]).to.be.closeTo(0, 20)
  })

  it('Should retry twice and fail', async function () {
    const octokit = new Octokit()

    try {
      await octokit.request('GET /route', {
        request: {
          responses: [
            { status: 403, headers: {}, data: { message: 'ONE' } },
            { status: 403, headers: {}, data: { message: 'TWO' } },
            { status: 401, headers: {}, data: { message: 'THREE' } }
          ],
          retries: 2
        }
      })
      throw new Error('Should not reach this point')
    } catch (error) {
      expect(error.status).to.equal(401)
      expect(error.message).to.equal('THREE')
    }
    expect(octokit.__requestLog).to.deep.equal([
      'START GET /route',
      'START GET /route',
      'START GET /route'
    ])
    expect(octokit.__requestTimings[1] - octokit.__requestTimings[0]).to.be.closeTo(0, 20)
    expect(octokit.__requestTimings[2] - octokit.__requestTimings[1]).to.be.closeTo(0, 20)
  })

  it('Should retry after 2000ms', async function () {
    const octokit = new Octokit({ retry: { retryAfterBaseValue: 50 } })

    const res = await octokit.request('GET /route', {
      request: {
        responses: [
          { status: 403, headers: {}, data: {} },
          { status: 202, headers: {}, data: { message: 'Yay!' } }
        ],
        retries: 1,
        retryAfter: 2
      }
    })

    expect(res.status).to.equal(202)
    expect(res.data).to.include({ message: 'Yay!' })
    expect(octokit.__requestLog).to.deep.equal([
      'START GET /route',
      'START GET /route',
      'END GET /route'
    ])
    // 50ms * 2 === 100ms
    expect(octokit.__requestTimings[1] - octokit.__requestTimings[0]).to.be.closeTo(100, 20)
  })

  it('Should allow end users to see the number of retries after a failure', async function () {
    const octokit = new Octokit({ retry: { retryAfterBaseValue: 25 } })

    try {
      await octokit.request('GET /route', {
        request: {
          responses: [
            { status: 403, headers: {}, data: { message: 'Failed, one' } },
            { status: 403, headers: {}, data: { message: 'Failed, two' } },
            { status: 403, headers: {}, data: { message: 'Failed, three' } },
            { status: 403, headers: {}, data: { message: 'Failed, four' } }
          ],
          retries: 3
        }
      })
      throw new Error('Should not reach this point')
    } catch (error) {
      expect(error.message).to.equal('Failed, four')
      expect(error.request.request.retryCount).to.equal(4)
    }

    // null (0) retryAfter
    expect(octokit.__requestTimings[3] - octokit.__requestTimings[2]).to.be.closeTo(0, 20)
  })

  it('Should allow end users to request retries', async function () {
    const octokit = new Octokit({ retry: { retryAfterBaseValue: 25 } })

    const res = await octokit.request('GET /route', {
      request: {
        responses: [
          { status: 403, headers: {}, data: { message: 'Did not retry' } },
          { status: 202, headers: {}, data: { message: 'Yay!' } }
        ],
        retries: 1,
        retryAfter: 1
      }
    })

    expect(res.status).to.equal(202)
    expect(res.data).to.include({ message: 'Yay!' })
    expect(octokit.__requestLog).to.deep.equal([
      'START GET /route',
      'START GET /route',
      'END GET /route'
    ])
    expect(octokit.__requestTimings[1] - octokit.__requestTimings[0]).to.be.closeTo(25, 20)
  })
})
