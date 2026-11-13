"""Download only the locked raw subset; verify against OpenNeuro git-annex MD5."""
import argparse
import hashlib
import json
from pathlib import Path
import urllib.request

LOCK = Path(__file__).with_name('dataset-lock.json')


def verify(path, entry):
    if not path.is_file() or path.stat().st_size != entry['bytes']:
        raise ValueError(f'Missing or wrong size: {path}')
    with path.open('rb') as stream:
        digest = hashlib.file_digest(stream, 'md5').hexdigest()
    if digest != entry['md5']:
        raise ValueError(f'Checksum mismatch: {path}')


def download(root):
    for entry in json.loads(LOCK.read_text())['files']:
        path = root / entry['path']
        if path.exists():
            verify(path, entry)
            continue
        path.parent.mkdir(parents=True, exist_ok=True)
        temporary = path.with_suffix('.partial')
        print(f"Downloading {entry['path']} ({entry['bytes']} bytes)", flush=True)
        with urllib.request.urlopen(entry['url'], timeout=120) as source, temporary.open('wb') as target:
            while chunk := source.read(4 * 1024 * 1024):
                target.write(chunk)
        verify(temporary, entry)
        temporary.replace(path)
        print('Verified', flush=True)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--data-dir', type=Path, default=Path('data/ds003626'))
    download(parser.parse_args().data_dir)
