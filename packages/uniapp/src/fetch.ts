export function fetchImageData(src: string): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    uni.request({
      url: src,
      responseType: 'arraybuffer',
      success(res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data as ArrayBuffer)
        } else {
          reject(new Error(`HTTP ${res.statusCode}`))
        }
      },
      fail(err) {
        reject(new Error(err.errMsg || 'Request failed'))
      },
    })
  })
}
