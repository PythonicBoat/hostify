{ pkgs }: {
  deps = [
    pkgs.python39Packages.pip
    pkgs.python39Packages.gunicorn
    pkgs.python39Full
  ];
}