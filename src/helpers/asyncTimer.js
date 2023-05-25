export default {
    asyncTimeout: async (milliseconds) => {
        await new Promise((resolve,reject) => {
            setTimeout(() => {
                resolve()
              }, milliseconds);
        })
    }
}