# GraphQL Lab – Books API

## Run

```bash
npm install
npm run dev
```

Endpoint: `http://localhost:3000/graphql` (send `POST` requests with Postman or any GraphQL client).

## Test users

| username | password   |
|----------|------------|
| admin    | admin123   |
| student  | student123 |

## Examples

```graphql
query {
  books { id title author year summary }
}
```

```graphql
mutation {
  login(username: "student", password: "student123")
}
```

Protected operations (`me`, `createBook`) need the token from `login` in a header:

```
Authorization: Bearer <token>
```

```graphql
mutation {
  createBook(title: "Refactoring", author: "Martin Fowler", year: 1999) { id title }
}
```

Data is kept in memory and resets when the server restarts.
