import fs from 'fs'
import cloudinary from './cloudinary'



export const sendToCloudinary = async (file: any) => {

    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(file.path,
            (error: Error, result: any) => {
                fs.unlinkSync(file.path)
                if (error) {
                    reject(error)
                } else {
                    resolve(result)
                }
            })
    })
}