import favicon from '../img/ck.png';

export default function makeFavicon() {
    //<link rel="icon" href="..." type="icon">

    const link = document.createElement("link");
    link.setAttribute("rel", "icon");
    link.setAttribute("type", "icon");
    link.setAttribute("href", favicon);

    document.getElementsByTagName('head')[0].appendChild(link)
}