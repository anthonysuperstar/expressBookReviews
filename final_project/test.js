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
            console.log(response.status)
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
            console.log(response.status)
        }
    } catch (err) {
        console.log(err)
    }
}

const apiAddReview = async () => {
    //* TO DO
}