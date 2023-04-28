class Dialog {
  constructor(dialog, click) {
    this.click = click;
    this.dialog = dialog;
    this.dialogIndex = 0;
    this.text = '';
    this.textIndex = 0;
    this.render = this.render.bind(this); // bind the render method to the Dialog instance
  }
  render() {
    if (this.textIndex === this.text.length) return this.set();
    if (this.textIndex < this.text.length) {
      document.getElementById('dialog-content').innerHTML += this.text.charAt(
        this.textIndex
      );
      this.textIndex++;
      setTimeout(this.render, 80);
    }
  }
  set() {
    if (this.dialogIndex === this.dialog.length) return this.end();
    this.textIndex = 0;
    this.text = this.dialog[this.dialogIndex];
    setTimeout(() => {
      document.getElementById('dialog-content').innerHTML = '';
      setTimeout(this.render, 1000);
    }, 1000);
    this.dialogIndex++;
  }
  end() {
    if (!this.click) {
      document.getElementById('nameForm').classList.add('bounce-in-top');
      setTimeout(() => {
        document.getElementById('name').focus();
      }, 1100);
    } else {
      const jsConfetti = new JSConfetti();
      jsConfetti.addConfetti();
    }
  }
  checking() {}
}

const handleClick = (event) => {
  document.getElementById('nameForm').style.visibility = 'hidden';
  const name = document.getElementById('name').value;
  const dialog = new Dialog(
    [
      'checking...',
      'Checking...',
      'nods..',
      `So you are ${name}, eh.`,
      'It looks like your on the list after all.',
      'Welcome!',
    ],
    true
  );
  dialog.set();
};

window.addEventListener('load', (event) => {
  const dialog = new Dialog(
    ['WOah, hold on there!', 'Are you on the list?', 'Let me see some ID.'],
    false
  );
  dialog.set();
});
