const Subscription = {
    count: {
        subscribe(parent, args, { pubsub }, info) {
            let count = 0

            setInterval(() => {
                count++
                pubsub.publish('count', {
                    count
                })
            }, 1000)

            return pubsub.asyncIterator('count')
       }
    }

}

export { Subscription as default }

/* Be careful with the spelling mistake.
  Typo: {
    "subscript": typing mistake,
    "subscribe": correct spelling
  } 
 */