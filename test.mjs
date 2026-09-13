import { test } from 'node:test'
import assert from 'node:assert/strict'
import { validate } from './src/index.js'

test('acepta un envío normal', () => {
  const { data, error } = validate({ name: 'Ana', email: 'a@b.co', message: 'hola', offer: '1500' })
  assert.equal(error, undefined)
  assert.equal(data.email, 'a@b.co')
})

test('rechaza correo inválido', () => {
  assert.equal(validate({ name: 'Ana', email: 'ana@localhost' }).error, 'Correo inválido')
  assert.equal(validate({ name: 'Ana', email: 'sin-arroba.co' }).error, 'Correo inválido')
})

test('rechaza nombre corto y mensaje largo', () => {
  assert.match(validate({ name: 'A', email: 'a@b.co' }).error, /Nombre/)
  assert.match(validate({ name: 'Ana', email: 'a@b.co', message: 'x'.repeat(2001) }).error, /Mensaje/)
})

test('honeypot lleno = spam', () => {
  assert.equal(validate({ name: 'Bot', email: 'a@b.co', website: 'http://x' }).error, 'spam')
})
