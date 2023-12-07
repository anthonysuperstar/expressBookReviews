const apiRegister = async () => {
    try {
        const response = await fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: 'user1', password: 'pwd123' })
        })

        if (response.ok){
            console.log('Registration passed')
        } else {
            console.log('Registration failed')
        }
    } catch (err) {
        console.log(err)
    }
}

const apiLogin = async () => {
    try {
        const response = await fetch('http://localhost:5000/customer/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: 'user1', password: 'pwd123' })
        })

        if (response.ok){
            console.log('Authentication passed')
        } else {
            console.log('Authentication failed')
        }
    } catch (err) {
        console.log(err)
    }
}

const apiAddReview = async () => {
    try {
        const response = await fetch('http://localhost:5000/customer/auth/review/2?review=cool', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if (response.ok){
            console.log('Review Posted successfully')
        } else {
            console.log('Review not posted')
        }
    } catch (err) {
        console.log(err)
    }
}

const apiUpdateReview = async () => {
    try {
        const response = await fetch('http://localhost:5000/customer/auth/review/2?review=boring', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if (response.ok){
            console.log('Review updated successfully')
        } else {
            console.log('Review not updated')
        }
    } catch (err) {
        console.log(err)
    }
}

const runTest = () => {
    apiRegister()
    .then(() => apiLogin())
    .then(() => apiAddReview())
    .then(() => apiUpdateReview())
}

runTest()