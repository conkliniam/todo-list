class ChecklistItem {
  constructor(text, checked, id) {
    this.text = text;
    this.checked = checked;
    this.id = Number(id);
  }

  toggleChecked() {
    this.checked = !this.checked;
  }
}

export default ChecklistItem;
