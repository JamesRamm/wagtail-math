// Preview class for KaTeX
class Preview {
  constructor(previewId, bufferId, inputId) {
    this.preview = document.getElementById(previewId);
    this.buffer = document.getElementById(bufferId);
    this.input = document.getElementById(inputId);
    this.delay = 150; // delay after keystroke before updating
    this.timeout = null; // store setTimout id
  }

  update() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      this.render();
    }, this.delay);
  }

  render() {
    if (this.preview.innerHTML === this.input.value) {
      return;
    }

    this.preview.innerHTML = this.input.value;
    renderMathInElement(this.preview, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false },
      ],
      throwOnError: false,
    });
  }
}

function initMathJaxPreview(id) {
  window.wagtailMathPreviews = window.WagtailMathPreviews || {};

  window.wagtailMathPreviews[id] = new Preview(
    "MathPreview-" + id,
    "MathBuffer-" + id,
    id,
  );

  window.wagtailMathPreviews[id].render();

  // attach a keyup event listener so we update the preview
  const target = document.getElementById(id);
  if (target) {
    target.addEventListener("keyup", function () {
      window.wagtailMathPreviews[id].update();
    });
  }
}
