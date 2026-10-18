import { CloseIcon, UploadIcon } from '@virgo-design/icons';
import {
  Alert,
  Avatar,
  Button,
  ColorPicker,
  Dialog,
  Field,
  Form,
  Input,
  Separator,
  Spinner,
  Textarea,
} from '@virgo-design/ui';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { MutationFeedback } from '@/components/mutation-feedback';
import { useMutation } from '@/hooks/async/use-mutation';

import type { profileEnUS } from '../../locales/en-US';
import {
  avatarFileError,
  avatarForeground,
  type ProfileIdentity,
  profileIdentity,
  profileInitials,
  validateProfileIdentity,
} from '../../model/profile';

import styles from './ProfileEditor.module.scss';
import shared from '@/styles/product-layout.module.scss';

export function ProfileEditor({
  profile,
  onSave,
  onClose,
  restoreFocus,
}: {
  profile: ProfileIdentity;
  onSave: (profile: ProfileIdentity) => Promise<void>;
  onClose: () => void;
  restoreFocus: () => void;
}) {
  const mutation = useMutation();
  const { t } = useTranslation();

  const [draft, setDraft] = useState(() => profileIdentity(profile));
  const [errors, setErrors] = useState<ReturnType<typeof validateProfileIdentity>>({});
  const [discard, setDiscard] = useState(false);
  const [reading, setReading] = useState(false);
  const [photoName, setPhotoName] = useState('');
  const [imageError, setImageError] = useState<keyof typeof profileEnUS.validation | ''>('');

  const formRef = useRef<HTMLFormElement>(null);
  const photoInput = useRef<HTMLInputElement>(null);
  const photoRevision = useRef(0);
  const alive = useRef(true);

  useEffect(() => {
    alive.current = true;

    return () => {
      alive.current = false;
    };
  }, []);

  const dirty = JSON.stringify(draft) !== JSON.stringify(profileIdentity(profile));

  const close = () => {
    if (dirty) setDiscard(true);
    else {
      alive.current = false;
      onClose();
    }
  };

  const update = <Key extends keyof ProfileIdentity>(key: Key, value: ProfileIdentity[Key]) => {
    setDraft((previous) => ({ ...previous, [key]: value }));
    setDiscard(false);
    setErrors((previous) => {
      const next = { ...previous };
      delete next[key];

      return next;
    });
  };

  return (
    <Dialog.Root
      open
      onOpenChange={(open) => {
        if (!open) close();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content
          size="md"
          className={styles.editorDialog}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            restoreFocus();
          }}
        >
          <Dialog.Header className={styles.editorHeader}>
            <div>
              <Dialog.Title>{t('profile.editYourProfile')}</Dialog.Title>
              <Dialog.Description>
                {t('profile.yourIdentityInTheVirgoStudioWorkspace')}
              </Dialog.Description>
            </div>
            <Dialog.Close aria-label={t('profile.closeProfileEditor')} variant="text">
              <CloseIcon />
            </Dialog.Close>
          </Dialog.Header>
          <Dialog.Body>
            <MutationFeedback pending={mutation.pending} error={mutation.error} />
            <Form
              inert={mutation.pending}
              aria-busy={mutation.pending}
              ref={formRef}
              id="profile-editor"
              size="medium"
              noValidate
              className={styles.editorForm}
              onSubmit={(event) => {
                event.preventDefault();

                const invalid = validateProfileIdentity(draft);
                setErrors(invalid);

                if (Object.keys(invalid).length) {
                  requestAnimationFrame(() =>
                    formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(),
                  );

                  return;
                }

                void mutation.run(async () => {
                  await onSave({
                    ...draft,
                    name: draft.name.trim(),
                    headline: draft.headline.trim(),
                    bio: draft.bio.trim(),
                  });

                  alive.current = false;
                  onClose();
                });
              }}
            >
              <Field invalid={Boolean(imageError)} className={styles.fullWidth}>
                <div className={styles.photoLayout}>
                  <div className={styles.photoRow}>
                    <Avatar
                      size="md"
                      shape="square"
                      fallback={profileInitials(draft.name)}
                      {...(draft.avatarImage ? { src: draft.avatarImage } : {})}
                      style={{
                        background: draft.avatarImage ? 'transparent' : draft.avatarColor,
                        border: 'none',
                        color: avatarForeground(draft.avatarColor),
                      }}
                    />
                    <div>
                      <strong>{t('profile.profilePhoto')}</strong>
                      <p>{t('profile.pngJpegOrWebpUpTo2Mb')}</p>
                    </div>
                    {reading ? (
                      <Spinner size="md" aria-label={t('profile.readingProfilePhoto')} />
                    ) : null}
                  </div>
                  <input
                    ref={photoInput}
                    hidden
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={async (event) => {
                      const file = event.currentTarget.files?.[0];
                      event.currentTarget.value = '';

                      if (!file) return;

                      const invalid = avatarFileError(file);
                      const revision = ++photoRevision.current;
                      setImageError(invalid);

                      if (invalid) {
                        setReading(false);

                        return;
                      }

                      setReading(true);

                      try {
                        const url = await new Promise<string>((resolve, reject) => {
                          const reader = new FileReader();
                          reader.onload = () => resolve(String(reader.result));
                          reader.onerror = () => reject(new Error('read'));
                          reader.readAsDataURL(file);
                        });

                        const image = new Image();
                        image.src = url;
                        await image.decode();

                        if (alive.current && revision === photoRevision.current) {
                          update('avatarImage', url);
                          setPhotoName(file.name);
                        }
                      } catch {
                        if (alive.current && revision === photoRevision.current)
                          setImageError('imageUnreadable');
                      } finally {
                        if (alive.current && revision === photoRevision.current) setReading(false);
                      }
                    }}
                  />
                  <div className={styles.photoActions}>
                    <Field.Control
                      render={(attributes) => (
                        <Button
                          id={attributes.id}
                          aria-describedby={attributes['aria-describedby']}
                          aria-invalid={attributes['aria-invalid']}
                          aria-busy={reading}
                          disabled={reading}
                          type="button"
                          size="medium"
                          variant="outline"
                          leadingIcon={<UploadIcon />}
                          onClick={() => photoInput.current?.click()}
                        >
                          {draft.avatarImage ? t('profile.changePhoto') : t('profile.chooseAPhoto')}
                        </Button>
                      )}
                    />
                    {draft.avatarImage ? (
                      <Button
                        size="medium"
                        variant="text"
                        type="button"
                        onClick={() => {
                          photoRevision.current++;
                          setReading(false);
                          setImageError('');
                          setPhotoName('');
                          update('avatarImage', '');
                        }}
                      >
                        {t('profile.removePhoto')}
                      </Button>
                    ) : null}
                  </div>
                </div>
                {photoName ? (
                  <p className={styles.photoFilename} role="status">
                    {photoName}
                  </p>
                ) : null}
                {imageError ? (
                  <Field.Message>{t(`profile.validation.${imageError}`)}</Field.Message>
                ) : (
                  <Field.Description>
                    {t('profile.theSelectedPhotoIsKeptInThisSession')}
                  </Field.Description>
                )}
              </Field>
              <Separator decorative className={styles.fullWidth} />
              <Field required invalid={Boolean(errors.name)}>
                <Field.Label>{t('profile.displayName')}</Field.Label>
                <Input
                  value={draft.name}
                  maxLength={60}
                  onChange={(event) => update('name', event.target.value)}
                />
                {errors.name ? (
                  <Field.Message>{t(`profile.validation.${errors.name}`)}</Field.Message>
                ) : null}
              </Field>
              <Field invalid={Boolean(errors.headline)}>
                <Field.Label>{t('profile.headline')}</Field.Label>
                <Input
                  value={draft.headline}
                  maxLength={100}
                  onChange={(event) => update('headline', event.target.value)}
                />
                {errors.headline ? (
                  <Field.Message>{t(`profile.validation.${errors.headline}`)}</Field.Message>
                ) : null}
              </Field>
              <Field invalid={Boolean(errors.bio)} className={styles.fullWidth}>
                <Field.Label>{t('profile.aboutYou')}</Field.Label>
                <Textarea
                  rows={4}
                  value={draft.bio}
                  maxLength={600}
                  onChange={(event) => update('bio', event.target.value)}
                />
                <Field.Description>
                  {t('profile.value600Characters', { v0: draft.bio.length })}
                </Field.Description>
                {errors.bio ? (
                  <Field.Message>{t(`profile.validation.${errors.bio}`)}</Field.Message>
                ) : null}
              </Field>
              <Field invalid={Boolean(errors.avatarColor)} className={styles.fullWidth}>
                <Field.Label>{t('profile.avatarBackground')}</Field.Label>
                <ColorPicker
                  size="medium"
                  value={draft.avatarColor}
                  onValueChange={(value) => update('avatarColor', value)}
                >
                  <div className={styles.colorRow}>
                    <ColorPicker.Trigger aria-label={t('profile.chooseAvatarColor')} />
                    <ColorPicker.HexField aria-label={t('profile.avatarHexColor')} />
                    {['#1664f9', '#127d55', '#824bc2', '#bf432a'].map((color) => (
                      <ColorPicker.Swatch
                        key={color}
                        value={color}
                        aria-label={t('profile.avatarColorValue', { v0: color })}
                      />
                    ))}
                  </div>
                  <ColorPicker.Panel variant="simple" aria-label={t('profile.avatarColorPicker')} />
                </ColorPicker>
                {errors.avatarColor ? (
                  <Field.Message>{t(`profile.validation.${errors.avatarColor}`)}</Field.Message>
                ) : null}
                <Field.Description>
                  {t('profile.shownBehindYourInitialsWhenNoPhotoIsSelected')}
                </Field.Description>
              </Field>
            </Form>
          </Dialog.Body>
          <Button.Group
            layout="custom"
            render={(groupProps) => (
              <Dialog.Footer {...groupProps} className={styles.editorFooter} />
            )}
          >
            {discard ? (
              <Alert intent="warning">
                <Alert.Title>{t('profile.discardProfileChanges')}</Alert.Title>
                <Alert.Description>{t('profile.yourSavedProfileWillStayAsItIs')}</Alert.Description>
                <Button.Group
                  layout="custom"
                  render={(groupProps) => <Alert.Action {...groupProps} />}
                >
                  <Button
                    size="medium"
                    variant="outline"
                    onClick={() => {
                      alive.current = false;
                      onClose();
                    }}
                  >
                    {t('profile.discardChanges')}
                  </Button>
                  <Button size="medium" onClick={() => setDiscard(false)}>
                    {t('profile.keepEditing')}
                  </Button>
                </Button.Group>
              </Alert>
            ) : (
              <>
                <span className={shared.caption}>
                  {dirty ? t('profile.unsavedChanges') : t('profile.yourProfileIsUpToDate')}
                </span>
                <Button
                  size="medium"
                  type="submit"
                  form="profile-editor"
                  disabled={mutation.pending || !dirty || reading}
                >
                  {t('profile.saveProfile')}
                </Button>
              </>
            )}
          </Button.Group>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
