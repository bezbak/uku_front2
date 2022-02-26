import { profileInfoAsync, selectProfileInfo } from "./ProfileSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

import Avatar from "../Avatar";
import EditIcon from "../icons/EditIcon";
import Icon from "../Icon";
import { IprofileInfo } from "@/services/types";

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
                            <path
                                d="M3.23501 20.9263L45.8032 4.20466C47.7789 3.47746 49.5045 4.6957 48.8643 7.73941L48.868 7.73566L41.62 42.5247C41.0828 44.9912 39.6442 45.5909 37.6317 44.4289L26.5942 36.1411L21.2704 41.3664C20.6817 41.9662 20.185 42.4722 19.0445 42.4722L19.8281 31.0283L40.2844 12.2C41.1748 11.4016 40.0857 10.9518 38.9121 11.7465L13.6324 27.9621L2.73464 24.4986C0.368921 23.7339 0.317413 22.0883 3.23501 20.9263V20.9263Z"
                                fill="currentColor"
                            />
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
                            <path
                                d="M1 49L4.36166 37.0734C2.19992 33.4049 1.06174 29.2309 1.06174 24.9432C1.06174 11.7409 11.8143 1 25.031 1C38.2476 1 49 11.7409 49 24.9432C49 38.1455 38.2476 48.8864 25.031 48.8864C20.9128 48.8864 16.8802 47.8334 13.3128 45.8339L1 49ZM13.9423 41.4779L14.676 41.9255C17.7862 43.8222 21.3671 44.8249 25.031 44.8249C36.0057 44.8249 44.934 35.9059 44.934 24.9432C44.934 13.9804 36.0057 5.06156 25.031 5.06156C14.0563 5.06156 5.12771 13.9804 5.12771 24.9432C5.12771 28.763 6.21454 32.4724 8.27041 35.6703L8.76451 36.4388L6.82866 43.3072L13.9423 41.4779Z"
                                fill="currentColor"
                            />
                            <path
                                d="M19.5311 14.0848L17.9336 14.0027C17.4319 13.9769 16.9397 14.135 16.5605 14.4456C15.7861 15.0796 14.5478 16.3054 14.1675 17.9028C13.6003 20.2844 14.4768 23.2009 16.7453 26.1173C19.0138 29.0338 23.2413 33.7 30.7166 35.6929C33.1256 36.3352 35.0206 35.9023 36.4825 35.0205C37.6405 34.322 38.4388 33.2012 38.7265 31.9339L38.9816 30.8108C39.0626 30.4539 38.8703 30.0917 38.5186 29.9388L33.12 27.5928C32.7696 27.4404 32.3539 27.5368 32.1183 27.8248L29.9989 30.4151C29.8387 30.6108 29.5647 30.6883 29.3173 30.6064C27.8658 30.1255 23.0041 28.2058 20.3364 23.361C20.2208 23.1509 20.2495 22.8958 20.4136 22.7165L22.4391 20.5074C22.646 20.2817 22.6984 19.9647 22.574 19.6904L20.247 14.5574C20.123 14.2842 19.8454 14.101 19.5311 14.0848Z"
                                fill="currentColor"
                            />
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
                            <path
                                d="M48.878 15.1122C48.7655 12.5617 48.353 10.8083 47.7621 9.289C47.1525 7.67625 46.2146 6.23236 44.9859 5.03205C43.7853 3.81306 42.3316 2.86585 40.7373 2.26588C39.2088 1.67506 37.4643 1.26263 34.9133 1.15018C32.3434 1.0282 31.5275 1 25.0093 1C18.4912 1 17.6753 1.0282 15.1149 1.14065C12.5639 1.2531 10.8102 1.6659 9.29095 2.25635C7.67753 2.86585 6.23336 3.80353 5.03282 5.03205C3.81359 6.23236 2.86657 7.68577 2.26612 9.27984C1.67519 10.8083 1.26268 12.5522 1.1502 15.1027C1.02821 17.6721 1 18.4878 1 25.0048C1 31.5217 1.02821 32.3374 1.14068 34.8973C1.25315 37.4478 1.66603 39.2012 2.25696 40.7205C2.86657 42.3333 3.81359 43.7772 5.03282 44.9775C6.23336 46.1965 7.68705 47.1437 9.28142 47.7436C10.8102 48.3345 12.5544 48.7469 15.1057 48.8593C17.6658 48.9722 18.482 49 25.0002 49C31.5183 49 32.3342 48.9722 34.8947 48.8593C37.4456 48.7469 39.1993 48.3345 40.7186 47.7436C43.9451 46.4964 46.496 43.946 47.7434 40.7205C48.334 39.192 48.7469 37.4478 48.8593 34.8973C48.9718 32.3374 49 31.5217 49 25.0048C49 18.4878 48.9905 17.6721 48.878 15.1122ZM44.5547 34.7098C44.4514 37.054 44.0575 38.3199 43.7293 39.1638C42.9226 41.2549 41.2626 42.9146 39.1711 43.7211C38.327 44.0493 37.0517 44.4431 34.7162 44.546C32.184 44.6588 31.4246 44.6866 25.0189 44.6866C18.6132 44.6866 17.8442 44.6588 15.3211 44.546C12.9765 44.4431 11.7103 44.0493 10.8663 43.7211C9.82546 43.3365 8.87807 42.727 8.10909 41.93C7.3119 41.1516 6.70229 40.214 6.31762 39.1733C5.98937 38.3294 5.59554 37.054 5.49259 34.7193C5.37976 32.1876 5.35191 31.4279 5.35191 25.0234C5.35191 18.619 5.37976 17.8501 5.49259 15.3279C5.59554 12.9837 5.98937 11.7178 6.31762 10.8739C6.70229 9.83293 7.3119 8.88609 8.11861 8.11689C8.89675 7.31986 9.83461 6.71036 10.8758 6.32613C11.7199 5.99794 12.9955 5.60418 15.3306 5.50089C17.8629 5.38844 18.6227 5.36024 25.028 5.36024C31.4432 5.36024 32.2027 5.38844 34.7258 5.50089C37.0704 5.60418 38.3365 5.99794 39.1806 6.32613C40.2214 6.71036 41.1688 7.31986 41.9378 8.11689C42.735 8.89524 43.3446 9.83293 43.7293 10.8739C44.0575 11.7178 44.4514 12.9929 44.5547 15.3279C44.6671 17.8597 44.6953 18.619 44.6953 25.0234C44.6953 31.4279 44.6671 32.1781 44.5547 34.7098Z"
                                fill="currentColor"
                            />
                            <path
                                d="M25.0065 12.6743C18.1978 12.6743 12.6736 18.1971 12.6736 25.0048C12.6736 31.8126 18.1978 37.3354 25.0065 37.3354C31.8156 37.3354 37.3394 31.8126 37.3394 25.0048C37.3394 18.1971 31.8156 12.6743 25.0065 12.6743ZM25.0065 33.0034C20.5894 33.0034 17.0064 29.4215 17.0064 25.0048C17.0064 20.5882 20.5894 17.0063 25.0065 17.0063C29.424 17.0063 33.0066 20.5882 33.0066 25.0048C33.0066 29.4215 29.424 33.0034 25.0065 33.0034V33.0034Z"
                                fill="currentColor"
                            />
                            <path
                                d="M40.7077 12.1872C40.7077 13.7769 39.4185 15.0659 37.8282 15.0659C36.2382 15.0659 34.949 13.7769 34.949 12.1872C34.949 10.5972 36.2382 9.30862 37.8282 9.30862C39.4185 9.30862 40.7077 10.5972 40.7077 12.1872V12.1872Z"
                                fill="currentColor"
                            />
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
