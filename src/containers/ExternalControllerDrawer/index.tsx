import { useAtom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'
import { useEffect } from 'react'

import { Modal, Input, Alert } from '@components'
import { useObject } from '@lib/hook'
import { useI18n, useAPIInfo, identityAtom } from '@stores'
import { localStorageAtom } from '@stores/request'
import './style.scss'

export default function ExternalController () {
    const { translation } = useI18n()
    const { t } = translation('Settings')
    const { hostname, port, secret } = useAPIInfo()
    const [identity, setIdentity] = useAtom(identityAtom)
    const [value, set] = useObject({
        hostname: '',
        port: '',
        secret: '',
    })

    useEffect(() => {
        set({ hostname, port, secret })
    }, [hostname, port, secret, set])

    const setter = useUpdateAtom(localStorageAtom)

    function handleOk () {
        const { hostname, port, secret } = value
        setter([{ hostname, port, secret }])
    }

    return (
        <Modal
            show={!identity}
            title={t('externalControllerSetting.title')}
            bodyClassName="external-controller"
            onClose={() => setIdentity(true)}
            onOk={handleOk}
        >

            <div className="flex items-center">
                <div className="md:my-3 w-14 my-1 font-bold">{t('externalControllerSetting.secret')}</div>
                <Input
                    className="md:my-3 w-14 my-1 flex-1"
                    align="left"
                    inside={true}
                    value={value.secret}
                    onChange={secret => set('secret', secret)}
                    onEnter={handleOk}
                />
            </div>
        </Modal>
    )
}
