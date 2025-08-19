import { describe, expect, it } from 'vitest'
import { GeneratePassword, getPass } from '../UserSuporte'



describe('Testing UserSuporte return function', ()=>{

    it('should return the a password with lenth 8', ()=>{
        const newPass = GeneratePassword(8)
        if(newPass !== false){
            expect(newPass).toHaveLength(8)
        }
    })

    it('should return false from password 0', ()=>{
        const newPass = GeneratePassword(0)
        expect(newPass).toBeFalsy()
    })

    it('should return the hashedPass and the saltKey', async () => {
    const returnGetPass = await getPass('senha123')

    if (typeof returnGetPass === 'object') {

        expect(typeof(returnGetPass.hashedPassword) === 'string').toBeTruthy();
        expect(typeof(returnGetPass.SaltKey) === 'string').toBeTruthy();

    } else {
        expect(typeof returnGetPass).toBe('string');
    }
});
})