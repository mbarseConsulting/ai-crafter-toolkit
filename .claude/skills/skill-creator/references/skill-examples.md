# Skill Examples

Collection of well-structured skills demonstrating best practices.

## Example 1: Simple Skill (Minimal Optional Tags)

### json-validator

A straightforward validation skill with just the essentials plus examples.

```markdown
---
name: json-validator
description: "Validate JSON files against schemas. Use when: (1) checking config files, (2) pre-deployment validation, (3) enforcing data contracts"
---

<objective>
Validate JSON configuration files to ensure they are well-formed and match expected schemas, preventing runtime errors from malformed configs.
</objective>

<quick_start>
1. Read the JSON file using Read tool
2. Parse JSON and check for syntax errors
3. Validate against schema if provided
4. Report validation results with specific error locations
</quick_start>

<success_criteria>
- JSON parsing succeeds or fails with clear error messages
- Schema validation identifies all mismatches
- Error locations include line and column numbers
- Validation completes in <1 second for files up to 1MB
</success_criteria>

<examples>
## Example 1: Valid JSON

**Input:**
```json
{"port": 8080, "host": "localhost"}
```

**Schema:**
```json
{"type": "object", "required": ["port", "host"]}
```

**Output:**
✅ Valid

## Example 2: Missing Required Field

**Input:**
```json
{"host": "localhost"}
```

**Output:**
❌ Line 1: Missing required field 'port'
</examples>

<anti_patterns>
❌ **Silently ignoring errors**
- Bad: Return success even when validation fails
- Good: Exit with error code and clear message
- Why: Silent failures lead to production incidents

❌ **Validating wrong schema version**
- Bad: Using Draft 4 validator for Draft 7 schemas
- Good: Check $schema field and use matching validator
- Why: Different drafts have incompatible features
</anti_patterns>
```

**Why this works:**
- Focused objective (one clear purpose)
- Actionable quick start
- Measurable success criteria
- Examples show concrete usage
- Anti-patterns prevent common mistakes
- No unnecessary optional tags

---

## Example 2: Medium Complexity (Workflow-Heavy)

### api-endpoint-creator

A skill with multiple phases requiring detailed workflow.

```markdown
---
name: api-endpoint-creator
description: "Create REST API endpoints with tests and docs. Use when: (1) adding new API routes, (2) scaffolding CRUD operations, (3) ensuring API consistency"
---

<objective>
Scaffold complete REST API endpoints following organizational patterns, including route handlers, validation, tests, and documentation, reducing endpoint creation time from 2 hours to 10 minutes.
</objective>

<quick_start>
1. Launch skill and provide endpoint details (resource, operations)
2. Review generated structure (route, handler, validation, tests)
3. Customize business logic in handler
4. Run tests to verify scaffolding
</quick_start>

<success_criteria>
- Endpoint follows RESTful conventions
- Request/response validation is present
- Unit tests cover happy path and errors
- OpenAPI documentation is generated
- All tests pass on first run
</success_criteria>

<workflow>
## Phase 1: Design

Ask user for:
- Resource name (e.g., "users", "orders")
- Operations needed (GET, POST, PUT, DELETE)
- Authentication requirements
- Validation rules

## Phase 2: Generation

Create files:
1. `routes/{resource}.js` - Route definitions
2. `handlers/{resource}.js` - Business logic stubs
3. `validators/{resource}.js` - Request validation
4. `tests/{resource}.test.js` - Test suite
5. Update `openapi.yaml` with endpoint docs

## Phase 3: Validation

Verify:
- Files follow project structure
- Tests are runnable
- No syntax errors
- Documentation is complete

## Phase 4: Testing

Guide user to:
1. Run test suite: `npm test tests/{resource}.test.js`
2. Implement business logic in handler
3. Re-run tests
4. Start dev server and test manually
</workflow>

<examples>
## Example 1: Simple CRUD

**Input:**
- Resource: "users"
- Operations: GET, POST
- Auth: JWT required
- Validation: email, password fields required

**Generated:**

routes/users.js:
```javascript
router.get('/users', auth, getUsers)
router.post('/users', auth, validate(userSchema), createUser)
```

validators/users.js:
```javascript
const userSchema = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 8 }
  }
}
```

tests/users.test.js:
```javascript
describe('POST /users', () => {
  it('creates user with valid data', async () => {
    const res = await request(app)
      .post('/users')
      .send({ email: 'test@example.com', password: 'password123' })
      .expect(201)

    expect(res.body).toHaveProperty('id')
  })

  it('rejects invalid email', async () => {
    const res = await request(app)
      .post('/users')
      .send({ email: 'invalid', password: 'password123' })
      .expect(400)
  })
})
```

</examples>

<anti_patterns>
❌ **Inconsistent naming**
- Bad: Mixing singular/plural (route: /user, file: users.js)
- Good: Consistent plural (route: /users, file: users.js)
- Why: Reduces confusion, follows REST conventions

❌ **Skipping validation**
- Bad: Directly using req.body without validation
- Good: Validate all inputs against schema
- Why: Prevents injection attacks and bad data

❌ **No error handling**
- Bad: Letting exceptions crash the server
- Good: Try-catch blocks with proper error responses
- Why: Server stability and useful error messages
</anti_patterns>

<validation>
After generation, verify:

1. **Run tests**: All generated tests should pass
2. **Check imports**: No missing dependencies
3. **Lint code**: Follows project style guide
4. **API docs**: OpenAPI spec is valid (use swagger validator)
5. **Manual test**: Start server, test endpoints with curl
</validation>
```

**Why this works:**
- Clear multi-phase workflow
- Detailed examples with code
- Validation section ensures quality
- Anti-patterns prevent mistakes
- Success criteria are measurable

---

## Example 3: Security-Critical Skill

### secret-manager

A skill handling sensitive data requiring security checklist.

```markdown
---
name: secret-manager
description: "Manage application secrets securely. Use when: (1) adding new secrets, (2) rotating credentials, (3) auditing secret usage"
---

<objective>
Securely manage application secrets using encrypted storage and following zero-trust principles, preventing credential leaks and enabling safe credential rotation.
</objective>

<quick_start>
1. Initialize secret store (if not exists)
2. Use `secret add <key>` to store secrets (prompts for value)
3. Reference secrets in code via environment variables
4. Never commit secrets to version control
</quick_start>

<success_criteria>
- Secrets are encrypted at rest
- No secrets appear in logs or error messages
- Audit trail records all secret access
- Failed decryption alerts security team
- Secrets can be rotated without code changes
</success_criteria>

<security_checklist>
- [ ] Secrets are never logged or displayed
- [ ] Encryption keys are stored separately (key management service)
- [ ] Access is authenticated and authorized
- [ ] Audit logs are tamper-proof
- [ ] Secrets are encrypted in transit (TLS)
- [ ] No secrets in error messages or stack traces
- [ ] Old secrets are properly deleted (not just marked inactive)
- [ ] Rate limiting prevents brute force
- [ ] Secrets expire and require rotation
- [ ] Development secrets differ from production
</security_checklist>

<workflow>
## Adding a Secret

1. Authenticate to secret manager
2. Prompt user for secret value (hidden input)
3. Encrypt value with master key
4. Store in encrypted database
5. Log access in audit trail
6. Confirm success (don't display secret)

## Rotating a Secret

1. Generate new secret value
2. Store new version alongside old
3. Update application configuration
4. Deploy changes
5. Verify new secret works
6. Delete old secret
7. Log rotation in audit trail

## Accessing a Secret

1. Authenticate request
2. Check authorization (RBAC)
3. Retrieve encrypted value
4. Decrypt with master key
5. Log access (who, when, which secret)
6. Return to caller (in memory only)
</workflow>

<anti_patterns>
❌ **Secrets in environment variables (container images)**
- Bad: ENV SECRET_KEY=abc123 in Dockerfile
- Good: Mount secrets at runtime from secret store
- Why: Images are often shared/published

❌ **Secrets in code**
- Bad: const apiKey = "sk_live_123..."
- Good: const apiKey = getSecret('API_KEY')
- Why: Code is in version control

❌ **Logging secrets**
- Bad: console.log('Using key:', secretKey)
- Good: console.log('Secret loaded successfully')
- Why: Logs persist and may be leaked

❌ **Unencrypted storage**
- Bad: Storing secrets in plain text database
- Good: Encrypt all secrets at rest
- Why: Database dumps/backups could leak

❌ **No rotation**
- Bad: Using same secrets forever
- Good: Regular rotation schedule (90 days)
- Why: Limits damage from compromised credentials
</anti_patterns>

<advanced_features>
## Automatic Rotation

Configure automatic rotation for supported services:

```javascript
secretManager.configure({
  autoRotate: {
    'DATABASE_PASSWORD': {
      interval: '90d',
      service: 'postgres',
      onRotate: async (newPassword) => {
        await updateDatabasePassword(newPassword)
      }
    }
  }
})
```

## Secret Versioning

Access previous versions of secrets:

```javascript
// Get current version
const current = await getSecret('API_KEY')

// Get specific version
const previous = await getSecret('API_KEY', { version: 2 })

// Rollback to previous version
await rollbackSecret('API_KEY')
```

## Multi-Environment Secrets

Organize secrets by environment:

```
secrets/
├── development/
│   ├── DATABASE_URL
│   └── API_KEY
├── staging/
│   ├── DATABASE_URL
│   └── API_KEY
└── production/
    ├── DATABASE_URL
    └── API_KEY
```
</advanced_features>
```

**Why this works:**
- Security checklist covers all critical aspects
- Workflow explains secure processes
- Anti-patterns prevent security mistakes
- Advanced features for power users
- Objective emphasizes security value

---

## Example 4: Teaching Skill (Context-Heavy)

### graphql-schema-designer

A skill that teaches while doing.

```markdown
---
name: graphql-schema-designer
description: "Design GraphQL schemas following best practices. Use when: (1) creating new GraphQL APIs, (2) refactoring existing schemas, (3) learning GraphQL design patterns"
---

<context>
GraphQL is a query language for APIs that allows clients to request exactly the data they need. Unlike REST, GraphQL uses a strongly-typed schema to define available operations and data structures.

This skill helps design schemas that are:
- **Discoverable**: Self-documenting with clear types and descriptions
- **Flexible**: Clients get exactly what they need
- **Evolvable**: Can change without breaking clients
- **Performant**: Avoid N+1 queries and over-fetching

Key concepts:
- **Types**: Object definitions with fields
- **Queries**: Read operations
- **Mutations**: Write operations
- **Resolvers**: Functions that fetch data for fields
</context>

<objective>
Guide users through designing production-ready GraphQL schemas that follow best practices for naming, structure, and performance, reducing API design time and preventing common pitfalls.
</objective>

<quick_start>
1. Define core entities (User, Product, Order, etc.)
2. Design queries (list, detail, search)
3. Design mutations (create, update, delete)
4. Add descriptions to all types and fields
5. Implement resolvers with DataLoader for efficiency
</quick_start>

<success_criteria>
- Schema is valid GraphQL SDL
- All types and fields have descriptions
- No N+1 query patterns
- Follows naming conventions (PascalCase for types, camelCase for fields)
- Mutations return updated objects
- Errors are typed (not just strings)
</success_criteria>

<examples>
## Example 1: Basic Query

**Before (REST-style thinking):**
```graphql
type Query {
  getUser(id: ID!): User
  getUserPosts(userId: ID!): [Post]
  getUserComments(userId: ID!): [Comment]
}
```

**After (GraphQL-style):**
```graphql
type Query {
  "Fetch a user by ID"
  user(id: ID!): User
}

type User {
  id: ID!
  name: String!
  "Posts authored by this user"
  posts: [Post!]!
  "Comments made by this user"
  comments: [Comment!]!
}
```

**Why better:**
- Clients can query relationships directly
- Single query gets all related data
- Self-documenting with descriptions

## Example 2: Mutation Design

**Before:**
```graphql
type Mutation {
  updateUser(id: ID!, name: String, email: String): Boolean
}
```

**After:**
```graphql
input UpdateUserInput {
  "User ID to update"
  id: ID!
  "New name (optional)"
  name: String
  "New email (optional)"
  email: String
}

type UpdateUserPayload {
  "The updated user"
  user: User
  "Typed errors if update failed"
  errors: [UserError!]
}

type Mutation {
  "Update an existing user"
  updateUser(input: UpdateUserInput!): UpdateUserPayload!
}
```

**Why better:**
- Input type is reusable and extensible
- Returns the updated object
- Errors are structured
- All fields documented
</examples>

<anti_patterns>
❌ **Using verbs in query names**
- Bad: getUser, fetchPost, listProducts
- Good: user, post, products
- Why: "query" already implies "get"

❌ **Boolean returns from mutations**
- Bad: updateUser(...): Boolean
- Good: updateUser(...): UpdateUserPayload
- Why: Can't return the object or errors

❌ **No descriptions**
- Bad: user(id: ID!): User
- Good: "Fetch user by ID" user(id: ID!): User
- Why: Schema should be self-documenting

❌ **N+1 query patterns**
- Bad: Resolver queries database for each item in list
- Good: Use DataLoader to batch requests
- Why: Performance disaster with large lists

❌ **Over-nesting**
- Bad: query.users.list.data.items[0].details.name
- Good: query.users[0].name
- Why: Adds complexity without benefit
</anti_patterns>

<advanced_features>
## Custom Scalars

Define domain-specific types:

```graphql
"ISO 8601 date-time string"
scalar DateTime

"Email address format"
scalar Email

"URL format"
scalar URL
```

## Interfaces and Unions

Model polymorphism:

```graphql
interface Node {
  id: ID!
}

type User implements Node {
  id: ID!
  name: String!
}

type Post implements Node {
  id: ID!
  title: String!
}

union SearchResult = User | Post

type Query {
  search(term: String!): [SearchResult!]!
}
```

## Directives

Add metadata to schema:

```graphql
type User {
  id: ID!
  email: String! @requireAuth
  salary: Float! @requireRole(role: ADMIN)
  internalId: ID! @deprecated(reason: "Use `id` instead")
}
```
</advanced_features>
```

**Why this works:**
- Context explains GraphQL fundamentals
- Examples show before/after transformations
- Anti-patterns teach through contrast
- Advanced features for deeper learning
- Objective balances teaching and doing

---

## Common Patterns Across Examples

### All Good Skills Have:

1. **Clear, specific objective**
   - Not "help with X" but "accomplish Y by doing Z"

2. **Actionable quick start**
   - 3-5 numbered steps
   - Can follow immediately

3. **Measurable success criteria**
   - Not "works well" but "completes in <1s" or "all tests pass"

4. **Appropriate optional tags**
   - Only use tags that add value
   - Don't include tags just to have them

5. **Concrete examples**
   - Real code, not pseudocode
   - Show input and output
   - Explain why it works

6. **Progressive disclosure**
   - Essentials in SKILL.md
   - Details in references/
   - <500 lines in SKILL.md

### Skill Complexity Guide:

**Simple skills** (like json-validator):
- Required tags only
- Maybe `<examples>` and `<anti_patterns>`
- No references/ needed

**Medium skills** (like api-endpoint-creator):
- Required tags + `<workflow>`
- `<examples>`, `<anti_patterns>`, `<validation>`
- Maybe references/ for detailed docs

**Complex skills** (like secret-manager):
- Required tags + multiple optional tags
- `<security_checklist>`, `<advanced_features>`
- Definitely references/ for deep dives

**Teaching skills** (like graphql-schema-designer):
- Required tags + `<context>`, `<examples>`, `<anti_patterns>`
- Heavy emphasis on before/after examples
- references/ with tutorials and guides

---

## Testing Your Skill

After creating a skill, test it with these scenarios:

1. **In-scope test**: Does it activate correctly?
2. **Edge case test**: Does it handle variations?
3. **Out-of-scope test**: Does it refuse appropriately?
4. **Documentation test**: Can someone use it without asking questions?
5. **Quality test**: Is SKILL.md <500 lines with no duplication?

If any test fails, refine the skill and test again.
