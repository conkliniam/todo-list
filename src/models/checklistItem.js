class ChecklistItem {
  constructor(text) {
    this.text = text;
    this.checked = false;
  }

  toggleChecked() {
    this.checked = !this.checked;
  }
}

export default ChecklistItem;
