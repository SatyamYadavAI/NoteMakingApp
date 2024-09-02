app.controller('NotesCtrl', function ($scope) {

    var _this = this;
    _this.ToggleSidebar = false;
    _this.ToggleModal = false;
    _this.isEditMode = false;
    _this.currentNoteIndex = null;

    _this.note = {
        title: '',
        description: ''
    };
    _this.notes = JSON.parse(localStorage.getItem('notes')) || [];
    
    _this.saveNote = function() {
        if (_this.isEditMode && _this.currentNoteIndex !== null) {
            // Update the existing note
            _this.notes[_this.currentNoteIndex] = {
                title: _this.note.title,
                description: _this.note.description
            };
        } else {
            // Add a new note
            _this.notes.push({
                title: _this.note.title,
                description: _this.note.description
            });
        }

        // Save the updated notes array to localStorage
        localStorage.setItem('notes', JSON.stringify(_this.notes));

        // Reset the form fields after saving
        _this.note.title = '';
        _this.note.description = '';
        _this.isEditMode = false;
        _this.currentNoteIndex = null;

        // Close the modal
        _this.ToggleModal = false;
    };

    _this.editNote = function(index) {
        // Set the note data in the form fields
        _this.note.title = _this.notes[index].title;
        _this.note.description = _this.notes[index].description;

        // Set edit mode to true
        _this.isEditMode = true;
        _this.currentNoteIndex = index;

        // Open the modal for editing
        _this.ToggleModal = true;
    };

    _this.removeNote = function(index) {
        // Remove the note at the specified index
        _this.notes.splice(index, 1);

        // Update the localStorage after removing the note
        localStorage.setItem('notes', JSON.stringify(_this.notes));
    };

    _this.showSidebar = function () {
        // Toggle the sidebar visibility
        _this.ToggleSidebar = !_this.ToggleSidebar;
    };

    _this.showModal = function () {
        // Toggle the modal visibility
        _this.ToggleModal = !_this.ToggleModal;
        _this.isEditMode = false; // Reset edit mode when opening modal for new note
        _this.note.title = ''; // Clear form fields when opening modal for new note
        _this.note.description = '';
    };
});
