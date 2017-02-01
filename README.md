# conditional-form-fields

Creates conditional fields in CMS forms

Usage:
Give conditional fields a data-condition attribute with name=conditionalValue
To show a field when another is empty, leave condition blank after '='
To check if a condition is false, use !=
For checkboxes, use name=checked or for unchecked use name!=checked

HTML Examples:
<div data-condition="status=published">(will be displayed when form field with name 'status' has value 'published')</div>
<div data-condition="title!=">(will be displayed when form field with name 'title' is not empty)</div>
<div data-condition="in_menu=checked">(will be displayed when checkbox with name 'in_menu' is checked)</div>
