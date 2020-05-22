const calcu1: Node = document.querySelector(".calcu-programador");
const calcu2: Node = document.querySelector(".calcu-estandar");
const btnsControl: NodeList = document.querySelectorAll(".control");

const btnsEstand: NodeList = document.querySelectorAll(
  ".calcu-estandar button"
);

const btnsProg: NodeList = document.querySelectorAll(
  ".calcu-programador button"
);

// para ocultar el menu de calcu programador al inicio como defecto
calcu1.style.display = "none";

btnsEstand.forEach((btnEstand) => {
  btnEstand.classList.add("available");
});

const deleteClass = (nodelist: NodeList, Class: string) => {
  nodelist.forEach((node: Node) => {
    node.classList.remove(Class);
  });
};

const addClass = (nodelist: NodeList, Class: string) => {
  nodelist.forEach((node: Node) => {
    node.classList.add(Class);
  });
};

// verifica el muestreo de calcu estandar y programador
const Control = (btn: Node) => {
  if (btn.id === "estandar") {
    calcu1.style.display = "none";
    deleteClass(btnsProg, "available");
    calcu2.style.display = "block";
    addClass(btnsEstand, "available");
  } else if (btn.id === "programador") {
    calcu2.style.display = "none";
    deleteClass(btnsEstand, "available");
    calcu1.style.display = "block";
    addClass(btnsProg, "available");
  }
};

btnsControl.forEach((btn) => {
  btn.addEventListener("click", () => {
    Control(btn);
  });
});
