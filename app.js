
let btn = document.querySelector(".input_btn")
console.log(btn)


btn.addEventListener('click', function() {
    let container = document.querySelector('.qr-code')
    //Удаление предыдущих qr
    while (container.firstChild) {
        container.removeChild(container.firstChild);
      }

    const inputData = document.querySelector('input').value;

    //получение значения выбранного типа QR
    const radioButtonList = document.getElementsByName('qrType');
    let qrType = null

    radioButtonList.forEach((radioButton) => {
        if (radioButton.checked) {
          qrType = radioButton.value;
        }
      });

    console.log(inputData)

    let url = "https://qgenr.fly.dev/qr/" + qrType + '/' + inputData
    console.log("URL: " + url)


    

    switch (qrType) {
        
        //PNG
        case 'png':
        fetch(url)
            .then(response => response.blob())
            .then(blob => {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(blob);
            container.appendChild(img);
            })
            .catch(error => console.error(error));


          break

        //ASCii
        case 'ascii':

        fetch(url)
            .then(response => response.text())
            .then(text => {
                const p = document.createElement('pre');
                p.textContent = text;
                container.appendChild(p);
            })
            .catch(error => console.error(error));
          break
      
          //SVG
        case 'svg':
        
        fetch(url)
            .then(response => response.blob())
            .then(blob => {
            const object = document.createElement('object');
            object.type = 'image/svg+xml';
            object.data = URL.createObjectURL(blob);
            container.appendChild(object);
            })
            .catch(error => console.error(error));
          break
      }
      console.log(container)

  });
