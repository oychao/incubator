class HelloWorldPlugin {
  constructor(props) {
    console.log(props);
  }

  apply(compiler) {
    compiler.plugin('done', (compilation) => {
      console.log('plugin, done');
    });
  }
}

module.exports = HelloWorldPlugin;