const Wish = require('./Wish')

test('validate with valid input', () => {
    const wish = { wish: 'to pass the test', priority: 'high' }
    expect(Wish.validate(wish)).toBeTruthy()
})

test('invalidate without wish description', () => {
    const wish = { priority: 'low' }
    expect(Wish.validate(wish)).toBeFalsy()
})

test('invalidate without priority', () => {
    const wish = { wish: 'to be invalid' }
    expect(Wish.validate(wish)).toBeFalsy()
})

test('get all wishes', () => {
    // Saving original
    const original = Wish.wishes

    // Mocking
    const wishList = [
        { wish: 'something', priority: 'normal', id: 1 },
        { wish: 'something else', priority: 'high', id: 2 }
    ]
    Wish.wishes = wishList

    // Testing
    expect(Wish.getAll()).toBe(wishList)

    // Restoring original
    Wish.wishes = original
})

test('get one wish by id', () => {
    // Saving original
    const original = Wish.wishes

    // Mocking
    const wishId = 1
    const wish = { wish: 'to be valid', priority: 'high', id: wishId }
    Wish.wishes = [{wish: 'not', priority: 'high', id: 2}, wish]

    // Testing
    expect(Wish.getOne(wishId)).toBe(wish)

    // Restoring original
    Wish.wishes = original
})

test('fail getting one wish by a nonexistent id', () => {
    const nonexistentId = '*'
    expect(Wish.getOne(nonexistentId)).toBeUndefined()
})

test('create a new wish', () => {
    const wish = { wish: 'to be created', priority: 'high' }
    const createdWishId = Wish.create(wish).id
    const createdWish = Wish.getOne(createdWishId)

    expect(createdWish.wish).toEqual(wish.wish)
    expect(createdWish.priority).toEqual(wish.priority)
    expect(createdWish.id).toBeDefined()

    // Cleaning up
    Wish.delete(createdWishId)
})

test('update a wish description by id', () => {
    // Saving original
    const original = Wish.wishes

    // Mocking
    const wishToUpdateId = 1
    Wish.wishes = [{ wish: 'to be updated', priority: 'high', id: wishToUpdateId }]

    // Testing
    const newWishDescription = 'already updated'
    Wish.patch(wishToUpdateId, { wish: newWishDescription })
    expect(Wish.getOne(wishToUpdateId).wish).toEqual(newWishDescription)

    // Retoring original
    Wish.wishes = original
})

test('update a wish priority by id', () => {
    // Saving original
    const original = Wish.wishes

    // Mocking
    const wishToUpdateId = 1
    Wish.wishes = [{ wish: 'to be updated', priority: 'high', id: wishToUpdateId }]

    // Testing
    const newWishPriority = 'low'
    Wish.patch(wishToUpdateId, { priority: newWishPriority })
    expect(Wish.getOne(wishToUpdateId).priority).toEqual(newWishPriority)

    // Retoring original
    Wish.wishes = original
})

test('delete wish by id', () => {
    // Saving original
    const original = Wish.wishes

    // Mocking
    const wishToDeleteId = 1
    Wish.wishes = [{ wish: 'to be deleted', priority: 'low', id: wishToDeleteId }]

    // Testing
    expect(Wish.getOne(wishToDeleteId)).toBeDefined()
    Wish.delete(wishToDeleteId)
    expect(Wish.getOne(wishToDeleteId)).toBeUndefined()

    // Restoring original (just for clarification purposes)
    Wish.wishes = original
})