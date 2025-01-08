import { setProfileName } from "../../components/Header";
import { isValid } from "../../helpers/errorSetter";
import { setInfo, getInfo } from "../../helpers/formHelpers";
import { api } from "../../axios/api";

export async function profileAction() {

    const getProfile = async () => {
        const response = await api.get('/doctor/profile')
        localStorage.setItem('name', response.data.name)
        localStorage.setItem('myId', response.data.id)
        return response.data;
    }

    const editProfile = async (data) => {
        const response = await api.put('/doctor/profile', data)
        

        if (!response.ok) {
            if (response.status == "400") {
                responseError({ message: "Duplicate email" });
                return;
            }
        }

    }

    function setupLoading(isLoading) {
        isLoading ? saveChangeButton.setAttribute('disabled', '') : saveChangeButton.removeAttribute('disabled')
        saveChangeButton.innerHTML = isLoading ?
            `<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
              <span role="status">Подождите...</span>` : 'Сохранить изменения';
    }

    const form = document.getElementById('profileForm')
    const data = await getProfile();
    setInfo(form, data)
    setProfileName(data.name)

    const saveChangeButton = document.getElementById('saveChanges')
    saveChangeButton.addEventListener('click', async () => {
        const data = getInfo(form);
        if (isValid(data)) {
            setupLoading(true)
            await editProfile(data)
            localStorage.setItem('name', data.name)
            setProfileName(data.name)
            setupLoading(false)
        }
    })
}

