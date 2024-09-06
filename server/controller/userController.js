import User from "../model/userModel.js";


// create the usser in the db 

export const create = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const { email } = newUser;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exist" });
    }

    const savedData = await newUser.save(); 
    
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error creating user",
      error: error.message,
    });
  }
};


// get all user from the database 

export const getAllUsers = async(req,res)=>{
    try {
        const userData = await User.find()
        if(!userData || userData.length === 0){
            return res.status(404).json({message:"No user found"})
        }

        return res.status(200).json(userData)
    } catch (error) {
        res.status(500).json({
            message: "Error user already exist",
            error: error.message,
          });
    }
}


// get users by id 

export const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const userData = await User.findById(id);
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(userData);
        
    } catch (error) {
        res.status(500).json({
            message: "Error user already exist",
            error: error.message,
          });
    }
}


// update the user inside the db 

export const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id)
        if (!userExist) {
            return res.status(404).json({ message: "User not found" });
        }
        const updatedData = await User.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(200).json({message:"User Updated Successfully"});
        
    } catch (error) {
        res.status(500).json({
            message: "Error updating user",
            error: error.message,
        })
        
    }
}


// delete the user from the database 


export const deleteUser = async(req,res)=>{
    try {
        const id = req.params.id;
        const userExist = await User.findById(id)
        if (!userExist) {
            return res.status(404).json({ message: "User not found" });
        }
        await User.findByIdAndDelete(id);
        return res.status(200).json({ message: "User deleted successfully" });
        
    } catch (error) {
         res.status(500).json({
            message: "Error deleting the user",
            error: error.message,
        })
        
    }
}