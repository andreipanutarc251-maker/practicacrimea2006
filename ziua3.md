# Notițe suplimentare – HTML & CSS
## 1. Trei reguli importante despre formulare HTML
1. **Fiecare formular trebuie să aibă atributul `action` și `method`**

   * `action` indică unde se trimit datele
   * `method` specifică metoda de trimitere (`GET` sau `POST`)

   Exemplu:

   ```html
   <form action="server.php" method="POST">
   ```
2. **Fiecare câmp de input trebuie să aibă atributul `name`**
   * Fără `name`, datele nu sunt trimise către server
   Exemplu:
   ```html
   <input type="text" name="username">
   ```
3. **Etichetele `<label>` trebuie asociate cu input-urile**

   * Ajută la accesibilitate și UX
   Exemplu:
   ```html
   <label for="email">Email:</label>
   <input type="email" id="email" name="email">
   ```
---
## 2. Explicația Box Model (Margin vs Padding)
Box Model reprezintă structura fiecărui element HTML și conține 4 părți:
* **Content** – conținutul (text, imagine)
* **Padding** – spațiul dintre conținut și border
* **Border** – conturul elementului
* **Margin** – spațiul exterior față de alte elemente
### Diferența principală:
* **Padding** = spațiu INTERIOR (în interiorul elementului)
* **Margin** = spațiu EXTERIOR (între elemente)
Exemplu:
```css
div{
  padding:20px; /* spațiu în interior */
  margin:20px;  /* spațiu în exterior */
  border:1px solid black;
}
```
---
## 3. Sintaxa corectă a unui selector de clasă

Selectorul de clasă este folosit pentru a stiliza elemente cu același atribut `class`.

### Sintaxă:

```css
.numeClasa{
  proprietate: valoare;
}
```

### Exemplu:

```css
.button{
  background-color: blue;
  color: white;
}
```

### Utilizare în HTML:

```html
<button class="button">Apasă</button>
```

---

## Concluzie

Formularele HTML sunt esențiale pentru colectarea datelor, Box Model definește spațierea elementelor, iar selectorii de clasă permit stilizarea eficientă și reutilizabilă a designului.
