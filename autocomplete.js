const creatAutoComplete = ({
  root,
  renderOption,
  onOptionSelect,
  inputValue,
  fetchData,
}) => {
  //this is a dropdown from bulma css fw
  root.innerHTML = `
    <label><b>Search</b></label>
    <input class="input"/>
    <div class="dropdown is-active">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div> 
`;
  let input = root.querySelector("input");
  const dropdown = root.querySelector(".dropdown");
  const resultsWrapper = root.querySelector(".results");

  const onInput = async (event) => {
    const items = await fetchData(event.target.value);

    //to remove the dropdown when there is no movie
    if (items.length === 0) {
      dropdown.classList.remove("is-active");
      return;
    }

    resultsWrapper.innerHTML = "";
    dropdown.classList.add("is-active");
    for (let item of items) {
      const option = document.createElement("a");

      option.classList.add("dropdown-item");
      option.innerHTML = renderOption(item);
      option.addEventListener("click", (e) => {
        dropdown.classList.remove("is-active");
        input.value = inputValue(item);

        onOptionSelect(item);
      });
      resultsWrapper.appendChild(option);
    }
    console.log(items);
  };

  input.addEventListener("input", debounce(onInput, 500));

  //to close the dropdown when i click outside the dropdown
  document.addEventListener("click", (event) => {
    if (!root.contains(event.target)) {
      dropdown.classList.remove("is-active");
    }
  });
};
