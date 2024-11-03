const slider = document.querySelector('.left-card-slider-1');
const sliderThumb = document.querySelector('.left-card-slider-thumb-1');
const saturationSlider = document.querySelector('.left-card-slider-2');
const saturationThumb = document.querySelector('.left-card-slider-thumb-2');

let isDragging = false;
let isDraggingSaturation = false;

let brightnessValue = 100;
let saturationValue = 100;

sliderThumb.addEventListener('mousedown', () => {
  isDragging = true;
});

saturationThumb.addEventListener('mousedown', () =>{
    isDraggingSaturation = true;
})

const imgupload = document.getElementById("Upload-img");
const imgpreview = document.getElementById("img-preview");
const imgdownload = document.getElementById("downloadLink");

imgupload.addEventListener("change", function(event){
  const file = event.target.files[0];
  if(file){
    const reader = new FileReader();
    reader.onload = function(e){
      imgpreview.innerHTML = `<img id="image-preview" src="${e.target.result}" alt="Uploaded Image">`;
      imgdownload.href = e.target.result;
      imgdownload.download = file.name;
      imgdownload.removeAttribute("disable");
    }
  
    reader.readAsDataURL(file);
  }else{
    imgpreview.innerHTML = "<span>Image Preview</span>";
    imgdownload.setAttribute  ("disable", true);
  }

});


document.addEventListener('mousemove', (event) => {
  if (isDragging) {
    const sliderRect = slider.getBoundingClientRect();
    let newLeft = event.clientX - sliderRect.left;

    // 限制滑块的移动范围
    newLeft = Math.max(0, Math.min(newLeft, sliderRect.width));

    // 更新滑块的位置
    sliderThumb.style.left = `${newLeft}px`;

    // 计算亮度值，基于滑块相对于中点的偏移量
    const sliderCenter = sliderRect.width / 2;
    const offsetFromCenter = newLeft - sliderCenter;

    // 将亮度范围设为0%到200%，中间为100%
    brightnessValue = Math.round(100 + (offsetFromCenter / sliderCenter) * 100);

    UpdateImage();
  }

  if (isDraggingSaturation) {
    const sliderRect = saturationSlider.getBoundingClientRect();
    let newLeft = event.clientX - sliderRect.left;

    // 限制滑块的移动范围
    newLeft = Math.max(0, Math.min(newLeft, sliderRect.width));

    // 更新滑块的位置
    saturationThumb.style.left = `${newLeft}px`;

    // 计算饱和度值，基于滑块相对于中点的偏移量
    const sliderCenter = sliderRect.width / 2;
    const offsetFromCenter = newLeft - sliderCenter;

    // 将饱和度范围设为0%到200%，中间为100%
    saturationValue = Math.round(100 + (offsetFromCenter / sliderCenter) * 100);

    UpdateImage();
  }
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  isDraggingSaturation = false;
});

function UpdateImage() {
  const imageElement = document.getElementById("image-preview"); // 获取图片元素
  if (imageElement) {
    imageElement.style.filter = `brightness(${brightnessValue}%) saturate(${saturationValue}%)`;
  } else {
    console.warn("Image element not found!");
  }
}


