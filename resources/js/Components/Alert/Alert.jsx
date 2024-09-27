import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export default function ShowAlert({ type, title = '', message = '', btnText = '' }) {
  useEffect(() => {
    let alertType = {
      icon: "info", // Default icon
      title: title || "Info",
      text: message || "No alert type specified",
      timer: btnText ? null : 2000, // If btnText exists, no timer; otherwise 3 seconds
      showConfirmButton: !!btnText, // If btnText exists, show confirm button
      confirmButtonText: btnText || undefined, // Set the confirm button text if provided
      confirmButtonColor: "#38bdf8",
      cancelButtonColor: "#D34053",
    };

    // Set additional properties based on 'type'
    switch (type) {
      case "success":
        alertType.icon = "success";
        alertType.title = title || "Success!";
        alertType.text = message || "Operation completed successfully";
        break;

      case "warning":
        alertType.icon = "warning";
        alertType.title = title || "Warning!";
        alertType.text = message || "Something might go wrong";
        break;

      case "error":
        alertType.icon = "error";
        alertType.title = title || "Error!";
        alertType.text = message || "An error occurred";
        break;

      case "confirmation":
        alertType.icon = "warning";
        alertType.title = title || "Are you sure?";
        alertType.text = message || "You won't be able to revert this!";
        alertType.showCancelButton = true;
        alertType.confirmButtonText = btnText || "Yes, proceed!";
        alertType.cancelButtonText = "No, cancel!";
        alertType.timer = null; // Disable timer for confirmation dialogs
        break;

      default:
        // Default 'info' type is already handled by the initial state
        break;
    }

    MySwal.fire(alertType);
  }, [type, title, message]);

  return null;
}