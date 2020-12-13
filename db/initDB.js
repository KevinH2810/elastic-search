const faker = require('faker')
const { CitizenService } = require("../services");

function initDB(){
  const citizenService = new CitizenService()

  citizenService.isEmptyCitizen((err, res) => {
    if (err){
      console.log(`Populating Citizen Collection inMongoDB and Elastic Error - retrying in 5 sec\n${error}`)
      setTimeout(initDB, 5000)
    }

    if (res > 0){
      console.log(`MongoDB Citizen Collection is Already Populated`)
      return
    }
  
    if (res === 0){
      let i = 0
      for (i = 0;i <= 400; i++){
        const citizen = {
          Name: faker.name.findName(),
          Email: faker.internet.email(),
          PhoneNumber: faker.phone.phoneNumber(),
          Address: faker.address.streetAddress(),
          City: faker.address.city(),
          State: faker.address.state(),
          Country: faker.address.country(),
          CompanyName: faker.company.companyName(),
          JobTitle: faker.name.jobTitle(),
          JobDescription: faker.name.jobDescriptor(),
          JobType: faker.name.jobType(),
        }

        citizenService.addCitizen(citizen,
					(err, result) => {
						if (err) {
							console.log(`[Error]-Error when adding data - ${citizen.Name}`)
							return;
						}
					}
				);
      }

      console.log("Database popoulated - ", i)
    }
  })
}

module.exports = () => {
  initDB()
}