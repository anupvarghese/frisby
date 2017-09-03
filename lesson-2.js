const Right = x => ({
  map: f => Right(f(x)),
  chain: f => f(x),
  fold: (f, g) => g(x),
  inspect: () => `Right(${x})`,

});

const Left = x => ({
  map: f => Left(x),
  chain: f => Left(x),
  fold: (f, g) => f(x),
  inspect: () => `Left(${x})`,
});

const fromNullable = x => x ? Right(x) : Left(null);

const tryCatch = f => {
  try {
    return Right(f());
  } catch (ex) {
    return Left(f());
  }
};

const fs = require('fs');

const getVersion = () =>
  tryCatch(() => fs.readFileSync('./package.json')).chain(c => tryCatch(() => JSON.parse(c))).fold(e => 3000, c => c.version);

const version = getVersion();

console.log(version);
