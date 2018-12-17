# Middleware stock

```javascript
const stock1 = new Stock
const stock2 = new Stock

stock2.use(async (ctx, next) => {
  console.log('stock2 fired')
})

stock1.use((ctx, next) => {
  ctx.state = {
    mode: 'middleware'
  }

  next()
})

stock1.use(async (ctx, next) => {
  const nowMoment = Date.now()
  await next()
  console.log(Date.now() - nowMoment)
})

stock1.use(async (ctx, next) => {
  console.log(ctx)
  await next()
})

stock1.use(stock2)

stock1.run()
```

```txt
// console:
{ state: { mode: 'middleware' } }
stock2 fired
41
```
