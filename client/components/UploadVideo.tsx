// 1. upload video
// 2. edit video details

import {
  Button,
  Group,
  Modal,
  Progress,
  Stack,
  Switch,
  Text,
  TextInput,
} from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { useForm } from '@mantine/hooks';
import { AxiosError, AxiosResponse } from 'axios';
import { Dispatch, SetStateAction, useState } from 'react';
import { useMutation } from 'react-query';
import { ArrowBigUpLine } from 'tabler-icons-react';
import { updateVideo, uploadVideo } from '../api';
import { useVideo } from '../context/videos';
import { Video } from '../types';

function EditVideoForm({
  videoId,
  setOpened,
}: {
  videoId: string;
  setOpened: Dispatch<SetStateAction<boolean>>;
}) {
  const {refetch} = useVideo()
  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      published: true,
    },
  });

  const mutation = useMutation<
    AxiosResponse<Video>,
    AxiosError,
    Parameters<typeof updateVideo>['0']
  >(updateVideo, {
    onSuccess: () => {
      setOpened(false);
      refetch();
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) =>
        mutation.mutate({ videoId, ...values })
      )}
    >
      <Stack>
        <TextInput
          label='Title'
          required
          placeholder='My awesome video'
          {...form.getInputProps('title')}
        />
        <TextInput
          label='Description'
          required
          {...form.getInputProps('description')}
        />
        <Switch label='Published' {...form.getInputProps('published')} />
        <Button type='submit'>Save</Button>
      </Stack>
    </form>
  );
}

function UploadVideo() {
  const [opened, setOpened] = useState<boolean>(false);
  const [progress, setProgress] = useState(0);

  const mutation = useMutation(uploadVideo);

  const config = {
    onUploadProgress: (progressEvent: any) => {
      const percent = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );

      setProgress(percent);
    },
  };

  function upload(files: File[]) {
    const formData = new FormData();
    formData.append('video', files[0]);
    mutation.mutate({ formData, config });
  }

  return (
    <>
      <Modal
        closeOnClickOutside={false}
        opened={opened}
        onClose={() => setOpened(false)}
        title='Upload Video'
        size='xl'
      >
        {progress === 0 ? (
          <Dropzone
            onDrop={(files) => upload(files)}
            accept={[MIME_TYPES.mp4]}
            multiple={false}
          >
            {(status) => (
              <Group
                position='center'
                spacing='xl'
                style={{
                  minHeight: '50vh',
                  justifyContent: 'center',
                }}
                direction='column'
              >
                <ArrowBigUpLine />
                <Text>Drag video here or click to find</Text>
              </Group>
            )}
          </Dropzone>
        ) : (
          <Progress size='xl' label={`${progress}%`} value={progress} mb='xl' />
        )}

        {mutation.data && (
          <EditVideoForm
            videoId={mutation.data.videoId}
            setOpened={setOpened}
          />
        )}
      </Modal>
      <Button onClick={() => setOpened(true)}>Upload video</Button>
    </>
  );
}

export default UploadVideo;
