import { profileInfoAsync, selectProfileInfo } from "./ProfileSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

import Avatar from "../Avatar";
import EditIcon from "../icons/EditIcon";
import Icon from "../Icon";
import InstagramIcon from "../icons/InstagramIcon";
import { IprofileInfo } from "@/services/types";
import TelagramIcon from "../icons/TelegramIcon";
import WhatsAppIcon from "../icons/WhatsAppIcon";

export interface IProfileInfoProps {
    info: IprofileInfo | null;
    onEdit: () => void;
}

export default function ProfileInfo({ info, onEdit }: IProfileInfoProps) {
    const ageToString = (age: number) => {
        var txt;
        let count = age % 100;
        if (count >= 5 && count <= 20) {
            txt = "лет";
        } else {
            count = count % 10;
            if (count == 1) {
                txt = "год";
            } else if (count >= 2 && count <= 4) {
                txt = "года";
            } else {
                txt = "лет";
            }
        }
        return age + " " + txt;
    };

    return (
        <div className="profile-info">
            <div className="profile-info__header">
                <Avatar
                    name="tets"
                    width={140}
                    height={140}
                    url={info?.avatar}
                />
                <button
                    type="button"
                    className="profile-info__edit"
                    onClick={onEdit}
                >
                    <Icon>
                        <EditIcon />
                    </Icon>
                </button>
            </div>
            <div className="profile-info__content">
                <h4 className="profile-info__name">
                    {info?.first_name} {info?.last_name}
                </h4>
                <span className="profile-info__info">
                    {info?.gender} {info && ageToString(info?.age)}
                </span>
            </div>
            <div className="profile-info__static">
                <div>
                    <div className="profile-info__static-title">Подписчики</div>
                    <div className="profile-info__static-desc">
                        {info?.followers_count}
                    </div>
                </div>
                <div>
                    <div className="profile-info__static-title">Подписки</div>
                    <div className="profile-info__static-desc">
                        {info?.following_count}
                    </div>
                </div>
                <div>
                    <div className="profile-info__static-title">Публикации</div>
                    <div className="profile-info__static-desc">
                        {info?.publications_count}
                    </div>
                </div>
            </div>
            <div className="profile-info__icons">
                {info?.telegram && (
                    <a
                        href={info?.telegram}
                        type="button"
                        className="profile-info__social"
                        style={{
                            backgroundColor: "#039BE5",
                        }}
                    >
                        <Icon width={29} height={29}>
                            <TelagramIcon />
                        </Icon>
                    </a>
                )}
                {info?.whatsapp && (
                    <a
                        href={info?.whatsapp}
                        type="button"
                        className="profile-info__social"
                        style={{
                            backgroundColor: "#1BD741",
                        }}
                    >
                        <Icon width={29} height={29}>
                            <WhatsAppIcon />
                        </Icon>
                    </a>
                )}
                {info?.instagram && (
                    <a
                        href={info?.instagram}
                        type="button"
                        className="profile-info__social"
                        style={{
                            backgroundColor: "#B06DB5",
                        }}
                    >
                        <Icon width={29} height={29}>
                            <InstagramIcon />
                        </Icon>
                    </a>
                )}
            </div>
            <style jsx>{`
                .profile-info {
                    text-align: center;
                }
                .profile-info__name {
                    font-weight: 500;
                    font-size: 18px;
                    margin: 12px 0 6px;
                }

                .profile-info__info {
                    color: #495360;
                }

                .profile-info__static {
                    padding: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 20px;
                    border: 1px solid #f0f0f0;
                    border-radius: 6px;
                    margin: 12px 0 24px;
                    flex-wrap: wrap;
                }

                .profile-info__static-title {
                    font-size: 14px;
                    color: #7e7e7e;
                }

                .profile-info__static-desc {
                    font-size: 14px;
                    margin-top: 12px;
                }

                .profile-info__header {
                    position: relative;
                }

                .profile-info__edit {
                    background: #ffffff;
                    border: 2px solid #d4d4d4;
                    border-radius: 50%;
                    width: 44px;
                    height: 44px;
                    position: absolute;
                    bottom: 0px;
                    right: 80px;
                    cursor: pointer;
                }

                .profile-info__icons {
                    display: flex;
                    column-gap: 12px;
                }

                .profile-info__social {
                    background: #039be5;
                    border-radius: 6px;
                    width: 42px;
                    height: 42px;
                    border: none;
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            `}</style>
        </div>
    );
}
