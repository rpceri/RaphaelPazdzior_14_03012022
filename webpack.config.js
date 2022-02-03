/*
ajout comme dareboost indiquait : " Cette page est exposée à des attaques du type "clickjacking""
Ne permettez pas à des personnes malveillantes d'intégrer vos pages sur leur site.
Clickjacking

Ce type d'attaque consiste à intégrer votre page sur un site malveillant via des balises <frame> ou <iframe>. Ainsi il est possible de faire croire à un internaute qu'il est sur votre propre page. L'internaute peu averti sera en confiance et sera potentiellement amené à saisir des informations que le site malveillant sera à même d'intercepter.

Vous devez donc indiquer quels domaines sont autorisés à intégrer votre page.

https://stackoverflow.com/questions/49277205/react-js-using-create-app-how-to-set-x-frame-options-on-webpack
https://codebun.com/how-to-configure-webpack-config-js/

1/ Utilisez un en-tête HTTP "X-Frame-Options".
*/

module.exports = {
    devServer: {
        headers: {
            'X-Frame-Options': 'sameorigin'
        }
    }
}