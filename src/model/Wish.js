/*
    This is the import of the tool we will be using to
    fake IDs for our registers.
*/
const uniqid = require('uniqid')

/*
    This is a basic JavaScript class which handles our
    fake wishes database. For more informations on JS
    classes, please visit: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
*/
class Wish {

    static wishes = []

    static create(wish) {
        if (Wish.validate(wish)) {
            wish.id = uniqid()
            Wish.wishes.push({ id: wish.id, wish: wish.wish, priority: wish.priority })
            return wish
        } else {
            return undefined
        }
    }

    static validate(wish) {
        let valid = true
        if (!wish.wish) valid = false
        if (!wish.priority) valid = false
        return valid
    }

    static getAll() {
        return Wish.wishes
    }

    static getOne(id) {
        const wish = Wish.wishes.find(item => item.id == id)
        return wish
    }

    static patch(id, patches) {
        const wishToPatch = Wish.getOne(id)
        if (wishToPatch) {
            if (patches.wish) wishToPatch.wish = patches.wish
            if (patches.priority) wishToPatch.priority = patches.priority
            
            const wishIndex = Wish.wishes.findIndex(item => item.id == id)
            Wish.wishes[wishIndex] = wishToPatch
            return wishToPatch
        } else {
            return undefined
        }
    }

    static delete(id) {
        const wishIndex = Wish.wishes.findIndex(item => item.id == id)
        if (wishIndex > -1) {
            Wish.wishes.splice(wishIndex, 1)
            return { message: 'Wish deleted successfully!' }
        } else {
            return undefined
        }
    }
}

/*
    Here we are exporting the class we just created, so
    it can be imported inside other files.
*/
module.exports = Wish