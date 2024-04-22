document.addEventListener("DOMContentLoaded", function () {
    const contentForm = document.getElementById("content-form");
    const blogPreview = document.getElementById("blog-preview");

    contentForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const title = document.getElementById("title").value;
      const text = document.getElementById("text").value;

      const post = document.createElement("div");
      post.classList.add("post");

      post.innerHTML = <h3>${title}</h3><p>${text}</p>;

      const imageFile = document.getElementById("image").files[0];
      const imageUrl = document.getElementById("image-url").value;
      if (imageFile) {
        const image = document.createElement("img");
        image.src = URL.createObjectURL(imageFile);
        post.appendChild(image);
      } else if (imageUrl) {
        const image = document.createElement("img");
        image.src = imageUrl;
        post.appendChild(image);
      }

      const videoFile = document.getElementById("video").files[0];
      const videoUrl = document.getElementById("video-url").value;
      if (videoFile) {
        const video = document.createElement("video");
        video.src = URL.createObjectURL(videoFile);
        video.setAttribute("controls", "true");
        post.appendChild(video);
      } else if (videoUrl) {
        const video = document.createElement("video");
        video.src = videoUrl;
        video.setAttribute("controls", "true");
        post.appendChild(video);
      }

      blogPreview.appendChild(post);

      contentForm.reset();
    });
  });

  function displayImageFromURL(url) {
    if (isValidURL(url)) {
      const image = new Image();
      image.src = url;
      image.onload = function () {
        const imageContainer = document.getElementById("image-container");
        imageContainer.innerHTML = "";
        imageContainer.appendChild(image);
      };
      image.onerror = function () {
        console.log("Error loading the image.");
      };
    } else {
      console.log("Invalid URL format.");
    }
  }

  function isValidURL(string) {
    const urlPattern = /^https?:\/\/.+\.(jpg|jpeg|png|gif|bmp)$/i;
    return urlPattern.test(string);
  }

  const imageUrlInput = document.getElementById("image-url");
  document
    .getElementById("display-image-btn")
    .addEventListener("click", function () {
      const imageUrl = imageUrlInput.value;
      displayImageFromURL(imageUrl);
    });