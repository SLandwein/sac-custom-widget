var ajaxPostCall = (type, source, message) => {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: "http://localhost:8000/events",
        type: "POST",
        dataType: "json",
        data: JSON.stringify({
            type: type,
            source: source,
            message: message
        }),
        headers: {
          "Content-Type": "application/json",
          "accept": "application/json"
        },
        crossDomain: true,
        success: function (response, status, xhr) {
          resolve({ response, status, xhr });
        },
        error: function (xhr, status, error) {
          console.log(error)
          const err = new Error('xhr error');
          err.status = xhr.status;
          reject(err);
        },
      });
    });
  };
  
  (function () {
    const template = document.createElement("template");
    template.innerHTML = `
        <style>
        </style>
        <div id="root" style="width: 100%; height: 100%;">
        </div>
      `;
    class MainWebComponent extends HTMLElement {
      async post(type, source, message) {
        const { response } = await ajaxPostCall(type, source, message);
        console.log(response);
        return response;
      }
    }
    customElements.define("custom-widget", MainWebComponent);
  })();