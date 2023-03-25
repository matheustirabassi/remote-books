// region isEmpty tests

test("Dado que o texto é nulo ou vazio, retorna verdadeiro", () => {
  expect("".isEmpty()).toEqual(true)
  expect(" ".isEmpty()).toEqual(true)
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
