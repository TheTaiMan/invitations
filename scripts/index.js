/* const names = {
  'Doe, J': 'WOAH, you are invited John Doe',
  'Smith, J': 'WOAH, you are invited Jane Smith',
};

document
  .getElementById('nameForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;

    if (names[name]) {
      document.getElementById('output').innerHTML = names[name];
    } else {
      document.getElementById('output').innerHTML = 'Name not found';
    }
  }); */

class Dialog {
  constructor() {
    this.dialog = [
      'WOah, hold on there!',
      'Are you on the list?',
      'Let me see some ID.',
    ];
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
  }
}

window.addEventListener('load', (event) => {
  const dialog = new Dialog();
  dialog.set();
});
