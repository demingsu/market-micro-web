module.exports = {
    lintOnSave: false,
    devServer: {
        open: true,
        port: 26001
    },
    chainWebpack: config => {
        config.devServer.set('inline', false)
        config.devServer.set('hot', false)
        if (process.env.NODE_ENV !== 'production') config.output.filename('js/[name].js')
        config.externals(['vue', 'vue-router'])
    },
    filenameHashing: false
}