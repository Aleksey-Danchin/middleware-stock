class Stock {
	constructor () {
		this.middlewares = []
	}

	use (middleware) {
		this.middlewares.push(middleware)
	}

	async run (context = {}) {
		const stock = this

		const collection = new Set

		let counter = 0

		await getNextFunction(counter++)()

		collection.clear()

		return context

		function getNextFunction (order) {
			return function () {
				const middleware = stock.middlewares[order]

				return new Promise((resolve, reject) => {
					if (collection.has(order)) {
						reject(new Error('Double next() fired.'))
					} else {
						collection.add(order)
					}

					setTimeout(async () => {
						try {
							if (middleware instanceof Promise || middleware instanceof Function) {
								const answer = await middleware(context, getNextFunction(counter++))
								resolve(answer)
							}

							if (middleware instanceof Stock) {
								const answer = await middleware.run(context)
								resolve(answer)
							}

							resolve(middleware)
						} catch (err) {
							reject(err)
						}
					})
				})
			}
		}
	}
}

export default Stock
