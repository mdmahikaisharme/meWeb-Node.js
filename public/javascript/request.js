const dForm = document.getElementsByTagName("form")[0],
      dMethod = document.getElementById("form-method"),
      dUrl = document.getElementById("form-url");


dMethod.addEventListener("change", e => {
    dForm.method = e.target.value;
});

dUrl.addEventListener("change", e => {
    dForm.action = e.target.value;
})