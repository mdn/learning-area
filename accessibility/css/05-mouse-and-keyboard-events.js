const imgThumb = document.querySelector('.thumb');

function showImg() {
    const imgZoom = document.createElement('img');

    imgZoom.setAttribute('src', imgThumb.getAttribute('src'));
    imgZoom.setAttribute('class', 'zoom');

    let widthOffest = imgThumb.x + imgThumb.width + 10;
    let heightOffset = imgThumb.y;

    imgZoom.style.left = widthOffest + 'px';
    imgZoom.style.top = heightOffset + 'px';

    document.body.appendChild(imgZoom);
}

function hideImg() {
    const imgZoom = document.querySelector('.zoom');
    imgZoom.parentElement.removeChild(imgZoom);
}

imgThumb.onmouseover = showImg;
imgThumb.onmouseout = hideImg;

imgThumb.onfocus = showImg;
imgThumb.onblur = hideImg;