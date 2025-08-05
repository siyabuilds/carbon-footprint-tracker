import Swal from "sweetalert2";

function generateCategoryOptions(activityData) {
  return Object.keys(activityData)
    .map((cat) => `<option value="${cat}">${cat}</option>`)
    .join("");
}

function setupCategoryChangeHandler(catSelect, actSelect, activityData) {
  catSelect.addEventListener("change", () => {
    const selectedCategory = catSelect.value;
    const activities = Object.keys(activityData[selectedCategory]);

    actSelect.innerHTML = activities
      .map((act) => `<option value="${act}">${act}</option>`)
      .join("");

    actSelect.disabled = false;
  });
}

function getFormHTML(categoryOptions) {
  return `
    <label for="swal-category">Category:</label>
    <select id="swal-category" class="swal2-select" style="width: 100%;">
      <option value="" disabled selected>Select category</option>
      ${categoryOptions}
    </select>
    <br/><br/>
    <label for="swal-activity">Activity:</label>
    <select id="swal-activity" class="swal2-select" style="width: 100%;" disabled>
      <option>Select a category first</option>
    </select>
  `;
}

export async function showActivityForm(activityData) {
  const categoryOptions = generateCategoryOptions(activityData);

  return Swal.fire({
    title: "Log an Activity",
    html: getFormHTML(categoryOptions),
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Log Activity",
    cancelButtonText: "Cancel",
    customClass: {
      popup: "swal-popup",
      title: "swal-title",
      confirmButton: "swal-confirm-btn",
      cancelButton: "swal-cancel-btn",
    },
    preConfirm: () => {
      const category = document.getElementById("swal-category").value;
      const activity = document.getElementById("swal-activity").value;

      if (!category || !activity) {
        Swal.showValidationMessage("Please select both category and activity");
        return false;
      }

      const co2 = activityData[category][activity];
      return { category, activity, co2 };
    },

    didOpen: () => {
      const catSelect = document.getElementById("swal-category");
      const actSelect = document.getElementById("swal-activity");
      setupCategoryChangeHandler(catSelect, actSelect, activityData);
    },
  }).then((result) => (result.isConfirmed ? result.value : null));
}
