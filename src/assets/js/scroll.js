const scroll = element => {
  const ele = document.getElementById(element);
  if (ele) {
    ele.scrollIntoView();
  }
  //   if (ele) {
  //     console.log("it don't sdcrol");
  //     window.scrollIntoView(ele.offsetLeft, ele.offsetTop);
  //   }
};
export default scroll;
