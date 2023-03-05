//play with the reacttive idea
const { computed, reactive, toRefs } = require("vue");
const person = reactive({ firstName: "boris", lastName: "Johnson" });
// const title = computed(
//   () => `${person.firstName} ${person.lastName} the greate`
// );
// console.log(title.value);
// person.firstName = "Cam Hao";
// console.log(title.value);

//using the toRefs
const refPerson = toRefs(person);
const title = computed(
  () => `${refPerson.firstName.value} ${refPerson.lastName.value} the greate`
);
console.log(title.value);
refPerson.firstName.value = "Cam Hao";
console.log(title.value);
