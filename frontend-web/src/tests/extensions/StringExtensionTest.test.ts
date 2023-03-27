// region isEmpty tests

test("Dado que o texto é vazio, retorna verdadeiro", () => {
  expect("".isEmpty()).toEqual(true)
}) 

test("Dado que o texto tem um espaço, retorna verdadeiro", () => {
  expect("123".isEmpty()).toEqual(false)
})

// endregion

// region isName tests

test("Dado que o texto não é um nome, retorna falso", () => {
  expect("abacate123".isName()).toEqual(false)
})

test("Dado que o texto é um nome, retorna verdadeiro", () => {
  expect("Matheus".isName()).toEqual(true)
})

// endregion

export {}
